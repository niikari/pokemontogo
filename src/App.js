import React, { useState } from "react";
import FindCard from "./components/FindCard";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Pokemonitvaihtoon.fi
          </Typography>
        </Toolbar>
      </AppBar>
      <FindCard />      
      
    </div>
  );
}

export default App;
