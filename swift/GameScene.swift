//
//  GameScene.swift
//  maze-escape
//
//  Created by Wayne Howarth on 23/07/2022.
//

import SpriteKit
import GameplayKit

class GameScene: SKScene, GameWorldListener {
    
	private var gameModel: GameModel!
	private var gameWorld: GameWorld!
	private var cam: SKCameraNode = SKCameraNode()
	private let worldDimensions = CGSize(width: 500, height: 500)
	private let mazeGenerator = MazeGeneratorImpl(width: 10, height: 10)
	private var moveForwardButton: SKShapeNode!
	private var turnRightButton: SKShapeNode!
	private var turnLeftButton: SKShapeNode!
	
	override func didMove(to view: SKView) {
		
		anchorPoint = CGPoint.zero//CGPoint(x: 0.5, y: 0.5)

		position = CGPoint(x: 0, y: 0)
		gameModel = try! GameModel(width: 10, height: 10, generator: mazeGenerator)
		
		gameWorld = GameWorld(scene: self, size: worldDimensions)
		gameWorld.position = CGPoint.zero
		gameWorld.zPosition = 0
		addChild(gameWorld)

		moveForwardButton = makeButton()
		moveForwardButton.position.x = -moveForwardButton.frame.width / 2
		moveForwardButton.position.y = -(self.scene?.frame.height)! / 2 + 150
		
		turnRightButton = makeButton()
		turnRightButton.position.x = moveForwardButton.frame.width / 2
		turnRightButton.position.y = -(self.scene?.frame.height)! / 2 + 150 - moveForwardButton.frame.height
		
		turnLeftButton = makeButton()
		turnLeftButton.position.x = -moveForwardButton.frame.width / 2 - turnLeftButton.frame.width
		turnLeftButton.position.y = -(self.scene?.frame.height)! / 2 + 150 - moveForwardButton.frame.height
		
		camera = cam
//		camera!.xScale = 2
//		camera!.yScale = 2
		addChild(cam)
		cam.position = CGPoint(x: 0, y: 0)
		
		gameModel.registerListener(listener: gameWorld)
		
		cam.addChild(moveForwardButton)
		cam.addChild(turnRightButton)
		cam.addChild(turnLeftButton)
		
//		addChild(moveForwardButton)
//		addChild(turnRightButton)
//		addChild(turnLeftButton)
	}
	
	public func releaseResources() {
		
	}
	
	override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
		if let touch = event?.allTouches?.first {
			
			let location = touch.location(in: cam)
			
			if moveForwardButton.contains(location) {
				gameModel.moveForward()
				return;
			}
			else if turnRightButton.contains(location) {
				gameModel.turnRight()
				return;
			}
			else if turnLeftButton.contains(location) {
				gameModel.turnLeft()
				return;
			}
			
			touchDown(atPoint: touch.location(in: touch.view))
		}
	}
	
	func touchDown(atPoint pos : CGPoint) {
		
	}
	
	override func update(_ currentTime: TimeInterval) {
		// Called before each frame is rendered
	}
	
	private func makeButton() -> SKShapeNode {
		let button = SKShapeNode(
			rect: CGRect(
				origin: CGPoint.zero,
				size: CGSize(width: 100, height: 100)
			)
		)
		button.fillColor = SKColor.blue
		button.lineWidth = 0
		return button
	}
	
	func moved(to position: (Int, Int)) {
		let physicalPosition = CGPoint(
			x: position.0 * 50,
			y: position.1 * 50
		)
		//cam.position = physicalPosition
	}
}
