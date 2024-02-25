//
//  Model.swift
//  maze-escape
//
//  Created by Wayne Howarth on 24/07/2022.
//  Copyright © 2022 Wayne Howarth. All rights reserved.
//

import Foundation

class GameModel: CharacterModelListener {
	
	private var width: Int
	private var height: Int
	private var currentScore: Int
	private var heroCharacter: CharacterModel?
	
	private var listener: GameModelListener?
	private var generator: MazeGenerator!
	
	private var maze: Maze
	
	var score: Int {
		get {
			return currentScore
		}
	}
	
	public init(width: Int, height: Int, generator: MazeGenerator) throws {
		self.width = width
		self.height = height
		self.generator = generator
		self.currentScore = 0
		self.heroCharacter = nil
		
		maze = generator.generateMaze()
	}
	
	public func registerListener(listener: GameModelListener) {
		self.listener = listener
		
		listener.setMazeDimensions(width: width, height: height)
		heroCharacter = listener.createHeroCharacter()
		heroCharacter?.registerListener(listener: self)
		listener.draw(heroCharacter!)
	}
	
	public func newGame() {
		currentScore = 0
		maze = generator.generateMaze()
	}
	
	public func moveForward() {
		heroCharacter?.moveForward()
	}
	
	public func turnRight() {
		heroCharacter?.turnRight()

		if let listener = listener {
			listener.turnRight()
		}
	}
	
	public func turnLeft() {
		heroCharacter?.turnLeft()
		
		if let listener = listener {
			listener.turnLeft()
		}
	}
	
	func canMove(_ direction: Direction, from: (Int, Int)) -> Bool {
		
		switch (direction)
		{
			case .North:
				return maze.canMoveNorth(from: from)
			case .East:
				return maze.canMoveEast(from: from)
			case .South:
				return maze.canMoveSouth(from: from)
			case .West:
				return maze.canMoveWest(from: from)
			case.None:
				return false
		}
	}
	
	func moved(_ character: CharacterModel) {
		if let listener = listener {
			listener.draw(character)
		}
	}
}
