//
//  GameModelListener.swift
//  maze-escape
//
//  Created by Wayne Howarth on 13/10/2022.
//

import Foundation

protocol GameModelListener {
	
	//	func animatePointsGained(value: Int, at: (Int, Int))
	//	func gameOver()
	func setMazeDimensions(width: Int, height: Int)
	func createHeroCharacter() -> CharacterModel
	func draw(_ character: CharacterModel)
	func turnRight()
	func turnLeft()
}
