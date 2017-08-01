//
//  ViewController.swift
//  wklab
//
//  Created by Sriharsha Vardhan on 17/01/17.
//  Copyright © 2017 ABB. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler,WKNavigationDelegate , URLSessionDelegate{
    
    var webView: WKWebView!;
    var uiImageView : UIImageView!;
    var bleHelper:BLEHelper? = nil
    var isABB:Bool =  true;
    var isCertCreateSuccess:Bool =  false;
    
    var certFileData : Data? = Data()
    var keyFileData : Data? = Data()
    
    var urlCredential:URLCredential? = nil;
    required init?(coder aDecoder: NSCoder) {
        
        super.init(coder: aDecoder);
    }
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
        // Custom initialization
    }
    
    
    override func viewDidLoad() {
        // Do any additional setup after loading the view, typically from a nib.
        
        //let routeScript = "(function() { window['_app_base'] = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/')+1);})();";
        
        //let userScript = WKUserScript(source: routeScript, injectionTime: WKUserScriptInjectionTime.atDocumentEnd, forMainFrameOnly: true);
        
        webView = WKWebView();
        uiImageView = UIImageView();
        
        uiImageView.frame = self.view.bounds;
        uiImageView.autoresizingMask = [.flexibleWidth, .flexibleHeight];
        uiImageView.translatesAutoresizingMaskIntoConstraints = false;
        uiImageView.contentMode = .scaleAspectFit
        uiImageView.image = UIImage(named: "Image");
        UIView.animate(withDuration: 2.5, delay: 2.5, options: UIViewAnimationOptions.curveEaseIn, animations: {
            self.uiImageView.alpha = 0.0
        }, completion: nil)
        
        
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
        view.addSubview(uiImageView)
        
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
       //DispatchQueue.main.asyncAfter(deadline: .now() + (10)) {
         //   self.sendToServer(serverAddr: "https://api.my-staging.busch-jaeger.de/api/user/key-value/presence-detector-backup/devices");
        //}
    }
    
    func setCertCreateState(certState: Bool){
        self.isCertCreateSuccess = certState;
        if(certState ==  true){

            let fm = FileManager.default
            let docsurl = try! fm.url(for:.documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
            let certFilePath = docsurl.appendingPathComponent("client.cert")
            let keyFilePath = docsurl.appendingPathComponent("client.private")
            
            
            
            var success: Bool
            let cert = CkoCert()
            success = cert!.load(fromFile: certFilePath.path)
            if success != true {
                print("\(cert?.lastErrorText)")
                return
            }
            
            var certChain: CkoCertChain? = cert?.getChain()
            if cert?.lastMethodSuccess != true {
                print("\(String(describing: cert?.lastErrorText))")
                return
            }
            
            let privKey = CkoPrivateKey()
            success = (privKey?.loadPemFile(keyFilePath.path))!
            if success != true {
                print("\(privKey?.lastErrorText)")
                certChain = nil
                return
            }
            
            let pfx = CkoPfx()
            success = (pfx?.add(privKey, certChain: certChain))!
            if success != true {
                print("\(pfx?.lastErrorText)")
                certChain = nil
                return
            }
            
            certChain = nil
            
            let pfxFilePath = docsurl.appendingPathComponent("client.pfx")
            
            //  Finally, write the PFX w/ a password.
            success = (pfx?.toFile("bje_detector", path: pfxFilePath.path))!
            if success != true {
                print("\(String(describing: pfx?.lastErrorText))")
                return
            }

            
            
            do{
                let directoryContents = try FileManager.default.contentsOfDirectory(at: docsurl, includingPropertiesForKeys: nil, options: [])
                print(directoryContents)

            }
            catch let error as NSError {
                print(error.localizedDescription)
            }
            
            
//            do {
//                try certFileData =  Data.init(contentsOf: certDerFilePath)
//                try keyFileData =  Data.init(contentsOf: keyFilePath)
//            }catch let error{
//                print("error \(error.localizedDescription)")
//            }

            
            
//            certFileData?.withUnsafeBytes {(bytes: UnsafePointer<UInt8>)->Void in
//                let CFdataPtr = CFDataCreate(kCFAllocatorDefault, bytes, (certFileData?.count)!)
//                let certSecCertData = SecCertificateCreateWithData(kCFAllocatorDefault,CFdataPtr!)
//                
//                var secTrust: SecTrust?
//                let secTrustStatus = SecTrustCreateWithCertificates(certSecCertData!, nil, &secTrust)
//                if secTrustStatus != errSecSuccess { return  }
//                // 3
//                var resultType: SecTrustResultType = SecTrustResultType(rawValue: UInt32(0))! // ignore results.
//                let evaluateStatus = SecTrustEvaluate(secTrust!, &resultType)
//                if evaluateStatus != errSecSuccess { return  }
//                // 4
//                let publicKeyRef = SecTrustCopyPublicKey(secTrust!)
//                //return publicKeyRef
//            
//            }
            
            


            


//            urlCredential = URLCredential.init(identity: SecIdentity as! SecIdentity, certificates: <#T##[Any]?#>, persistence: URLCredential.Persistence.permanent)
        }
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
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!){
        
        if(webView.url?.absoluteURL.absoluteString.contains("index.html#/welcome"))!{
            
            var appFlavor:Dictionary<String,Bool> = [:]
            
            appFlavor["isabb"] =  isABB;
            let jsData = Utilities.jsonStringify(data: appFlavor as AnyObject)
            
            let script: String = "setFlavor(\(jsData))"
            DispatchQueue.main.async {
                //Run UI Updates
                self.webView?.evaluateJavaScript(script);
            }
        };
        
        print("url loader is " ,(webView.url?.absoluteURL)!)
    }

    public func webView(_ webView: WKWebView, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Swift.Void){
        
    }
    
    public func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Swift.Void) {
        if(self.isCertCreateSuccess){
        completionHandler(URLSession.AuthChallengeDisposition.useCredential, URLCredential(trust: challenge.protectionSpace.serverTrust!))
        }

    }
    
    
    func sendToServer( serverAddr: String){
        
        let request = NSMutableURLRequest(url: NSURL(string: serverAddr)! as URL)
        request.httpMethod = "GET"
        //let postString = "UID=\(uid)&Gender=\(gender)"
        //request.httpBody = postString.data(using: String.Encoding.utf8)
        
        let session: URLSession =  URLSession(configuration: URLSessionConfiguration.default, delegate: self, delegateQueue: nil)
        
        let task = session.dataTask(with: request as URLRequest) {
            data, response, error in
            
            if error != nil {
                print("error=\(error)")
                return
            }
            
            print("response = \(response)")
            
            let responseString = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
            print("responseString = \(responseString)")
        }
        task.resume()
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
    
    
    func showToast(message : String) {
        
        let toastLabel = UILabel(frame: CGRect(x: self.view.frame.size.width/2 - 115, y: self.view.frame.size.height-100, width: 200, height: 45))
        toastLabel.backgroundColor = UIColor.black.withAlphaComponent(0.6)
        toastLabel.textColor = UIColor.white
        toastLabel.textAlignment = .center;
        toastLabel.font = UIFont(name: "Montserrat-Light", size: 12.0)
        toastLabel.text = message
        toastLabel.alpha = 1.0
        toastLabel.layer.cornerRadius = 10;
        toastLabel.clipsToBounds  =  true
        self.view.addSubview(toastLabel)
        UIView.animate(withDuration: 4.0, delay: 0.1, options: .curveEaseOut, animations: {
            toastLabel.alpha = 0.0
        }, completion: {(isCompleted) in
            toastLabel.removeFromSuperview()
        })
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

