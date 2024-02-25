//
//  World.swift
//  stack-em-up
//
//  Created by Wayne Howarth on 05/04/2021.
//  Copyright © 2021 Wayne Howarth. All rights reserved.
//

import Foundation
import SpriteKit

class GameWorld: SKCropNode, GameModelListener {
	
	private var container: SKShapeNode!
	
	private var horizontalCount: Int = -1
	private var verticalCount: Int = -1
	private var roomWidth: CGFloat = -1
	private var roomHeight: CGFloat = -1
	private var wallWidth: CGFloat = -1
	
	private let rotateRight: SKAction = SKAction.rotate(byAngle: -90 * .pi / 180, duration: 0.25)
	private let rotateLeft: SKAction = SKAction.rotate(byAngle: 90 * .pi / 180, duration: 0.25)
	
	private var sprites: [CharacterModel: SKNode] = [:]
	
	init(scene: SKScene, size: CGSize) {
		super.init()
		
		zPosition = 1
		let mask = SKSpriteNode()
		mask.color = SKColor.black
		mask.size = size
		mask.position = CGPoint.zero
		mask.anchorPoint = CGPoint.zero
		//maskNode = mask
		
		let containerRect = CGRect(
			origin: CGPoint.zero,
			size: size
		)
		
		container = SKShapeNode(path: CGPath(rect: containerRect, transform: nil), centered: true)
//		container.position = CGPoint(
//			x: -(containerRect.width / 2) + (scene.size.width - containerRect.size.width) / 2,
//			y: -(containerRect.height / 2) + (scene.size.height - containerRect.size.height) / 2
//		)
		container.position = CGPoint.zero
		container.fillColor = SKColor.yellow//Palette.worldBackground
		container.lineWidth = 0
		addChild(container)
	}
	
	required init?(coder aDecoder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	public func setMazeDimensions(width: Int, height: Int) {
		horizontalCount = width
		verticalCount = height
		
		wallWidth = 0//15
		
		roomWidth = (container.frame.width - CGFloat(horizontalCount + 1) * wallWidth) / CGFloat(horizontalCount) * 2
		roomHeight = (container.frame.height - CGFloat(verticalCount + 1) * wallWidth) / CGFloat(verticalCount)
		
		try! drawMaze(inside: container)
	}
	
	private func clearMaze() {
		
	}
	
	private func drawMaze(inside container: SKShapeNode) throws {
		guard horizontalCount != -1 && verticalCount != -1 else {
			throw GameError.DimensionsNotInitialised
		}
		
		guard roomWidth != -1 && roomHeight != -1 && wallWidth != -1 else {
			throw GameError.DimensionsNotInitialised
		}
		
		for x in 0..<horizontalCount + 1 {
			let path = CGMutablePath()
			path.move(to: CGPoint(x: CGFloat(x) * (roomWidth + wallWidth) + wallWidth / 2, y: 0))
			path.addLine(to: CGPoint(x: CGFloat(x) * (roomWidth + wallWidth) + wallWidth / 2, y: container.frame.size.height))
			let pathNode = SKShapeNode(path: path)
			pathNode.strokeColor = .red
			pathNode.lineWidth = wallWidth
			addChild(pathNode)
		}
		
		for y in 0..<verticalCount + 1 {
			let path = CGMutablePath()
			path.move(to: CGPoint(x: 0, y: CGFloat(y) * (roomHeight + wallWidth) + wallWidth / 2))
			path.addLine(to: CGPoint(x: container.frame.size.width, y: CGFloat(y) * (roomHeight + wallWidth) + wallWidth / 2))
			let pathNode = SKShapeNode(path: path)
			pathNode.strokeColor = .red
			pathNode.lineWidth = wallWidth
			addChild(pathNode)
		}
	}
	
	private func centreCoordinates(cell: (Int, Int)) -> CGPoint {
		return CGPoint(
			x: -250 + CGFloat(cell.0) * (wallWidth + roomWidth) + wallWidth + roomWidth / 2,
			y: -250 + CGFloat(cell.1) * (wallWidth + roomHeight) + wallWidth + roomHeight / 2
		)
	}
	
	internal func createHeroCharacter() -> CharacterModel {
		let characterNode = SKShapeNode(
			rect: CGRect(
				origin: CGPoint.zero,
				size: CGSize(width: roomWidth / 2, height: roomHeight / 2)
			)
		)
		characterNode.fillColor = SKColor.green
		characterNode.lineWidth = 0
		
		container.addChild(characterNode)
		
		let character = CharacterModel(x: 0, y: 0)
		
		sprites[character] = characterNode
		
		return character
	}
	
	func draw(_ character: CharacterModel) {
		if let sprite = sprites[character] {
		
			let physicalPosition = centreCoordinates(cell: (character.position.0, character.position.1))
			
			let cameraPosition = CGPoint(
				x: CGFloat(character.position.0) * roomWidth + roomWidth / 2,
				y: CGFloat(character.position.1) * roomHeight + roomHeight / 2
			)
			
			sprite.position = CGPoint(
				x: physicalPosition.x - sprite.frame.width / 2,
				y: physicalPosition.y - sprite.frame.height / 2
			)
			//scene?.camera?.position = cameraPosition
		}
	}
	
	func turnRight() {
		//scene?.camera?.run(SKAction.sequence([rotateRight, SKAction.moveBy(x: 0, y: (roomHeight / 2 + wallWidth / 4) + (roomWidth / 2 + wallWidth / 4), duration: 1.0)]))
		scene?.camera?.run(SKAction.sequence([rotateRight, SKAction.moveBy(x: 0, y: roomHeight / 2, duration: 1.0)]))
	}
	
	func turnLeft() {
		
	}
}
