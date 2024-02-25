//
//  Direction.swift
//  maze-escape
//
//  Created by Wayne Howarth on 13/10/2022.
//

import UIKit

public enum Direction: UInt8 {
	case None = 0
	case North = 1
	case East = 2
	case South = 4
	case West = 8
	
	public func Opposite() -> Direction {
		switch (self) {
			case .North:
				return .South
			case .East:
				return .West
			case.South:
				return .North
			case.West:
				return .East
			case.None:
				return .None
		}
	}
}
