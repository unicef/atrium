import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Button, Image } from '../atoms'
import { DeleteButton } from '../../components/projects/overview/assets'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  websites: {
    width: '100%'
  },
  website: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1.2px solid #E7E7E7',
    borderRadius: '5px',
    padding: '2%',
    marginBottom: '2%'
  },
  deleteButton: {
    backgroundColor: 'white',
    minWidth: 0,
    width: '12px',
    height: '13px'
  }
}))

function WebsitesList({ websites, editting, setWebsites }) {
  const classes = useStyles()

  return (
    <div className={classes.websites}>
      {websites.map((item, i) => (
        <div key={item.replace(/s/g, '') + i} className={classes.website}>
          <Typography>{item}</Typography>
          {editting ? (
            <Button
              className={classes.deleteButton}
              onClick={() => setWebsites(websites.filter(el => el !== item))}
            >
              <Image
                sameSize
                borderRadius={0}
                width="14px"
                height="14px"
                src={DeleteButton}
              />
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default WebsitesList
