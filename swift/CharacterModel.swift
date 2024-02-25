//
//  CharacterModel.swift
//  maze-escape
//
//  Created by Wayne Howarth on 13/10/2022.
//

import Foundation

public class CharacterModel: Hashable {
	
	private let characterId: String
	private var positionX: Int
	private var positionY: Int
	private var facing: Direction
	
	private var listener: CharacterModelListener?
	
	public var position: (Int, Int) {
		get {
			return (positionX, positionY)
		}
	}
	
	public init(x: Int, y: Int) {
		characterId = UUID().uuidString
		positionX = x
		positionY = y
		facing = .North
	}
	
	static public func == (lhs: CharacterModel, rhs: CharacterModel) -> Bool {
		return lhs.characterId == rhs.characterId
	}
	
	public func hash(into hasher: inout Hasher) {
		hasher.combine(characterId)
	}
	
	public func registerListener(listener: CharacterModelListener) {
		self.listener = listener
	}
	
	public func moveForward() {
		if let listener = listener {
			guard (listener.canMove(facing, from: (positionX, positionY))) else {
				return
			}
			
			switch (facing) {
				case .North:
					positionY = positionY + 1
					break
				case .East:
					positionX = positionX + 1
					break
				case .South:
					positionY = positionY - 1
					break
				case .West:
					positionX = positionX - 1
					break
				case .None:
					break;
			}
			
			listener.moved(self)
		}
	}
	
	public func turnRight() {
		switch (facing)
		{
			case .North:
				facing = .East
				break
			case .East:
				facing = .South
				break
			case .South:
				facing = .West
				break
			case .West:
				facing = .North
				break
			case .None:
				break
		}
	}
	
	public func turnLeft() {
		switch (facing)
		{
			case .North:
				facing = .West
				break
			case .East:
				facing = .North
				break
			case .South:
				facing = .East
				break
			case .West:
				facing = .South
				break
			case .None:
				break
		}
	}
}
