//
//  Utilities.swift
//  iNetRadio
//
//  Created by Sriharsha Vardhan on 06/02/15.
//  Copyright (c) 2015 ABB. All rights reserved.
//

import Foundation
import UIKit
struct Utilities {

    static func jsonStringify(data: AnyObject) -> String {
        let valid: Bool = JSONSerialization.isValidJSONObject(data)
        if valid {
            if let data = try? JSONSerialization.data(withJSONObject: data, options: []) {
                if let result = NSString(data: data, encoding: String.Encoding.utf8.rawValue) {
                    return result as String;
                }
            }
        }
        return "";
    }
    


    static func jsonParseDictionary(jsonString: String) -> [String: AnyObject] {
        if let data = jsonString.data(using: String.Encoding.utf8) {
            if let dictionary = (try? JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions(rawValue: 0)))  as? [String: AnyObject] {
                return dictionary
            }
        }
        return [String: AnyObject]()
    }

}
