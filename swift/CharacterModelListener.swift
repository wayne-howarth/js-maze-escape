//
//  CharacterModelListener.swift
//  maze-escape
//
//  Created by Wayne Howarth on 13/10/2022.
//

import Foundation

public protocol CharacterModelListener {
	func canMove(_ direction: Direction, from: (Int, Int)) -> Bool
	func moved(_ character: CharacterModel)
}
