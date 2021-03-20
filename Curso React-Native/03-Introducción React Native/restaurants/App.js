import Navigation from './navigations/Navigation';
import React from 'react';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Navigation />
  );
}
