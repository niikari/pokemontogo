import React, { useState } from "react";
import pokemon from 'pokemontcgsdk';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

pokemon.configure({apiKey: '61c8fc59-acbb-41b3-8aac-fbfef83f167e'})

export default function FindCard() {

    const [card, setCard] = useState({name: '', number: ''})
    const [cardInfo, setCardInfo] = useState({price: '', set: ''})
    const [cards, setCards] = useState([])

    const [open, setOpen] = useState(false)

    const handleChange = (e) => {
        setCard({...card, [e.target.name] : e.target.value})
    }

    const find = () => {
        pokemon.card.where({ q: `name:${card.name}`})
        .then(result => setCards(result.data))     
        .catch(err => console.log(err))
    }

    const showCardInfo = (index) => {
        console.log(index)
        try {
            setCardInfo(cards[index.index].tcgplayer.prices.holofoil.market)
            
        } catch (Exception) {
            try {
                setCardInfo(cards[index.index].tcgplayer.prices.normal.market)
            } catch (Exception) {
                setCardInfo('Ei tiedossa / ei arvoa')
            }
        }
        setOpen(true)
    }

    return (
        <div style={{ marginTop:20 }}>
            <Stack spacing={2} direction="row">
                <TextField name='name' type="text" value={card.name} placeholder="Nimi" onChange={handleChange} />
                <TextField name='number' type="number" value={card.number} placeholder="Numero (025/140)" onChange={handleChange} />
                
            </Stack>
            <Button variant="contained" size="large" onClick={find} style={{marginTop:10}}>Hae kortti</Button>
            <table style={{marginTop:20}}>
                <tbody>
                    {
                        cards.map((item, index) =>
                        item.number === card.number && <tr key={index}>
                        <td><Paper onClick={() => showCardInfo({index})} elevation={3}><img src={item.images.small} /></Paper></td>
                    </tr>)
                    }
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Markkinahinta $"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {cardInfo}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpen(false)}>Sulje</Button>                   
                </DialogActions>
            </Dialog>
            
        </div>
    )
}