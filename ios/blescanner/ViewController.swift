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
        webView.load(URLRequest(url: URL(fileURLWithPath: path!)));
        
        super.viewDidLoad()
        bleHelper = BLEHelper(webView: webView)
        bleHelper?.setup();
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage){
        print("Message received: \(message.name) with body: \(message.body)");
        let command = message.body as! String
        switch command {
        case "scan":
            bleHelper?.scan()
        case "connect":
            bleHelper?.connect()
        case "services":
            bleHelper?.getServices()
        case "devices":
            bleHelper?.getScannedDevices()
        default:
            print("Unknown command")
        }
    }
    
}

