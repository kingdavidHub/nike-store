import { View, Text } from 'react-native'
import React from 'react'
import { ChevronLeft, Menu } from 'lucide-react-native'

const NavBar = () => {
  return (
    <View className="top-nav">
      <ChevronLeft />
      <Menu />
    </View>
  )
}

export default NavBar;