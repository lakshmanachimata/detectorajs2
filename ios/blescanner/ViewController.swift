//
//  ViewController.swift
//  wklab
//
//  Created by Sriharsha Vardhan on 17/01/17.
//  Copyright © 2017 ABB. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler {
    
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
        
        webView.configuration.websiteDataStore = WKWebsiteDataStore.default();
        //webView.configuration.userContentController.addUserScript(userScript);
        webView.configuration.userContentController.add(self, name: "webapi");
        webView.configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs");
        
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
        bleHelper = BLEHelper(webView: webView)
        bleHelper?.setup();
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

    
    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage){
        print("Message received: \(message.name) with body: \(message.body)");
        let webMessageData = message.body as! String
        let dict = convertToDictionary(text: webMessageData)
        let firstKey = Array(dict!.keys)[0]
        let firstValue = Array(dict!.values)[0] as? String
        switch firstKey {
        case "connect":
            bleHelper?.connect(device: firstValue!)
            break;
        default:
            print("Unknown command")
        }
    }
    
}

