//
//  GameWorldListener.swift
//  maze-escape
//
//  Created by Wayne Howarth on 30/11/2022.
//

import Foundation

protocol GameWorldListener {
	//	func animatePointsGained(value: Int, at: (Int, Int))
	//	func gameOver()
	func moved(to position: (Int, Int))
}
