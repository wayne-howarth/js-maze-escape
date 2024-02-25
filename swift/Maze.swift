//
//  Maze.swift
//  maze-escape
//
//  Created by Wayne Howarth on 21/12/2022.
//

import Foundation

public class Maze {
	
	private var width: Int
	private var height: Int
	
	private var walls: [UInt8]
	
	public init(width: Int, height: Int) {
		self.width = width
		self.height = height
		
		walls = Array(repeating: Direction.None.rawValue, count: width * height)
		
		for i in 0..<width {
			makeWall(at: (i, 0), edge: .South)
			makeWall(at: (i, height - 1), edge: .North)
		}
		
		for j in 0..<height {
			makeWall(at: (0, j), edge: .West)
			makeWall(at: (width - 1, j), edge: .East)
		}
	}
	
	public func getWidth() -> Int {
		return self.width
	}
	
	public func getHeight() -> Int {
		return self.height
	}
	
	public func canMoveNorth(from: (Int, Int)) -> Bool {
		return !isWall(at: (from.0, from.1), direction: .North)
	}
	
	public func canMoveSouth(from: (Int, Int)) -> Bool {
		return !isWall(at: (from.0, from.1), direction: .South)
	}
	
	public func canMoveEast(from: (Int, Int)) -> Bool {
		return !isWall(at: (from.0, from.1), direction: .East)
	}
	
	public func canMoveWest(from: (Int, Int)) -> Bool {
		return !isWall(at: (from.0, from.1), direction: .West)
	}
	
	public func isWall(at: (Int, Int), direction: Direction) -> Bool {
		guard at.0 >= 0 && at.0 <= width - 1 && at.1 >= 0 && at.1 <= height - 1 else {
			return false
		}
		
		return walls[at.1 * width + at.0] & direction.rawValue != 0
	}
	
	public func makeWall(at: (Int, Int), edge: Direction) {
		guard at.0 >= 0 && at.0 <= width - 1 && at.1 >= 0 && at.1 <= height - 1 else {
			return
		}
		
		walls[at.1 * width + at.0] = walls[at.1 * width + at.0] | edge.rawValue
		
		if edge == .North && at.1 < height - 1 {
			walls[(at.1 + 1) * width + at.0] = walls[(at.1 + 1) * width + at.0] | edge.Opposite().rawValue
		}
		
		if edge == .South && at.1 > 0 {
			walls[(at.1 - 1) * width + at.0] = walls[(at.1 - 1) * width + at.0] | edge.Opposite().rawValue
		}
		
		if edge == .East && at.0 < width - 1 {
			walls[at.1 * width + at.0 + 1] = walls[at.1 * width + at.0 + 1] | edge.Opposite().rawValue
		}
		
		if edge == .West && at.0 > 0 {
			walls[at.1 * width + at.0 - 1] = walls[at.1 * width + at.0 - 1] | edge.Opposite().rawValue
		}
	}
}
