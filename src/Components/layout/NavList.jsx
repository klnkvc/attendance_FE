import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as React from "react";
import menuItems from "../../menu-items/index.jsx";

const NavList=({handleClick})=>{
    return <>
        {menuItems().items.map((item, index)=>{
            if(item.length===0){
                return null
            }
            return <div key={index}>
                <List>
                    {item.map((data) => (
                        <ListItem key={data.id} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={()=>handleClick(data.url)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {data.icon}
                                    {/*{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
                                </ListItemIcon>
                                <ListItemText primary={data.title} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </div>
        })}
    </>
}
export default NavList