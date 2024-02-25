//
//  MazeGeneratorImpl.swift
//  maze-escape
//
//  Created by Wayne Howarth on 21/12/2022.
//

import Foundation

public class MazeGeneratorImpl: MazeGenerator {
	
	private let width, height: Int
	
	public init(width: Int, height: Int) {
		self.width = width
		self.height = height
	}
	
	public func generateMaze() -> Maze {
		let maze = Maze(width: width, height: height)
		
		return maze
	}
	
}
