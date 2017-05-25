//
//  ViewController.swift
//  wklab
//
//  Created by Sriharsha Vardhan on 17/01/17.
//  Copyright © 2017 ABB. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler,WKNavigationDelegate {
    
    var webView: WKWebView!;
    var bleHelper:BLEHelper? = nil
    required init?(coder aDecoder: NSCoder) {
        
        super.init(coder: aDecoder);
    }
    
    override func viewDidLoad() {
        // Do any additional setup after loading the view, typically from a nib.
        
        //let routeScript = "(function() { window['_app_base'] = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/')+1);})();";
        
        //let userScript = WKUserScript(source: routeScript, injectionTime: WKUserScriptInjectionTime.atDocumentEnd, forMainFrameOnly: true);
        
        webView = WKWebView();
        
        
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight];
        webView.translatesAutoresizingMaskIntoConstraints = false;
        
        webView.scrollView.bounces = false;
        webView.navigationDelegate = self
        webView.configuration.websiteDataStore = WKWebsiteDataStore.default();
        //webView.configuration.userContentController.addUserScript(userScript);
        webView.configuration.userContentController.add(self, name: "webapi");
        webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs");
        webView.allowsLinkPreview = false;
        
        view.addSubview(webView)
        
        //https://www.raywenderlich.com/110393/auto-layout-visual-format-language-tutorial
        //TODO: Doesn't work for landscape and upside down in case of iPhone but works for iPad
        view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "|[webView]|",
                                                           options: NSLayoutFormatOptions(rawValue: 0),
                                                           metrics: nil,
                                                           views: ["webView": webView]));
        
        let device = UIDevice.current.model;
        if (device == "@iPhone") {
            view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-[webView]-|",
                                                               options: NSLayoutFormatOptions(rawValue: 0),
                                                               metrics: nil,
                                                               views: ["webView": webView]));
            
            view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "H:|-[webView]-|",
                                                               options: NSLayoutFormatOptions(rawValue: 0),
                                                               metrics: nil,
                                                               views: ["webView": webView]));
            
        } else {
            view.addConstraints(NSLayoutConstraint.constraints(withVisualFormat: "V:|-20-[webView]-|",
                                                               options: NSLayoutFormatOptions(rawValue: 0),
                                                               metrics: nil,
                                                               views: ["webView": webView]));
        }
        
        let path = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "www")
        let dirpath = Bundle.main.bundlePath.appending("/www/");
        //let dirUrl = (URL(fileURLWithPath: dirpath));
        let indexPath =  (URL(fileURLWithPath: path!));

        let webAppUrl = URL(fileURLWithPath: dirpath, isDirectory: true)
            
        //webView.load(URLRequest(url: URL(fileURLWithPath: path!)));
    
        webView.loadFileURL( indexPath, allowingReadAccessTo: webAppUrl)

        
        
        super.viewDidLoad()
        bleHelper = BLEHelper(webView: webView, topView: self)
        bleHelper?.setup();
    }
    
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if navigationAction.navigationType == .linkActivated  {
             let newURL = navigationAction.request.url;
                if (newURL?.absoluteString.contains("busch-jaeger.de"))!
                {
                UIApplication.shared.openURL(newURL!)
                decisionHandler(.cancel)
            } else {
                decisionHandler(.allow)
            }
        } else {
            decisionHandler(.allow)
        }
    }

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func convertToDictionary(text: String) -> [String: Any]? {
        if let data = text.data(using: .utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
            } catch {
                print(error.localizedDescription)
            }
        }
        return nil
    }

    func sendBleDataToApp(indata : [UInt8]) {
        
        
        
        var bleSendData:Dictionary<String,String> = [:]
        
        var charDataArray:[UInt16] = []
        var bleDataStr:String = ""
        
        
        print("RECV");
        
        indata.forEach { (bytedata) in
            print(bytedata,terminator:"");
            print(",",terminator:"");
            let charVal:UInt16 =  (UInt16(0x00FF & bytedata))
            charDataArray.append(charVal)
        }
        print("");
        bleDataStr = String(utf16CodeUnits: charDataArray, count: charDataArray.count)
        bleSendData["data"] = bleDataStr;
        
        let jsData = Utilities.jsonStringify(data: bleSendData as AnyObject)
    
        let script: String = "setBLEDataToService(\(jsData))"
        DispatchQueue.main.async {
            //Run UI Updates
            self.webView?.evaluateJavaScript(script);
        }

    
    }
    
    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage){
        
        DispatchQueue.global(qos: .background).async {
            DispatchQueue.main.async {
                    print("");
                    print("SEND");
                    print("\(message.body)");
                    print("");
                let webMessageData = message.body as! String
                let dict = self.convertToDictionary(text: webMessageData)
                let firstKey = Array(dict!.keys)[0]
        
                switch firstKey {
                case "connect":
                    let firstValue = Array(dict!.values)[0] as? String
                    self.bleHelper?.connect(device: firstValue!)
                    break;
                case "send":
                    let firstValue = Array(dict!.values)[0] as? [UInt8]
                    var isEscapeExists:Bool =  false;
                    var newBleData: [UInt8] = []
                    for (index, element) in (firstValue?.enumerated())!{
                        if(element == 125 || element == 126 )
                        {
                            if(index != 0 && index != ((firstValue?.count)!-1)) {
                                isEscapeExists = true;
                                newBleData.append(125)
                                newBleData.append(element)
                            }else {
                                newBleData.append(element)
                            }
                        }
                        else {
                            newBleData.append(element)
                        }
                    }
                    
                    if(isEscapeExists ==  true) {
                        let bleData = Data.init(bytes: newBleData)
                        self.bleHelper?.writeWithoutResponse(frame: bleData)
                    }else {
                        let bleData = Data.init(bytes: firstValue!)
                        self.bleHelper?.writeWithoutResponse(frame: bleData)
                    }
                    break;
                case "disconnect":
                    let firstValue = Array(dict!.values)[0] as? String
                    self.bleHelper?.disConnect(device: firstValue!)
                    break;
                default:
                    print("Unknown command")
                }
            }
        }
    }    
}

