import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Comment } from '../../../../molecules'

export default function CustomizedTreeView() {
  return (
    <Grid container item xs={12}>
      <Comment id="67676" user="Gustav Strömfelt" content={
        "@Gustav Strömfelt  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five..."
      } date={new Date()} >
        <Comment id="67676" user="Gustav Strömfelt" content={
        "@Gustav Strömfelt  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five..."
      } date={new Date()} />
      </Comment>

      <Comment id="67676" user="Gustav Strömfelt" content={
        "@Gustav Strömfelt  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five..."
      } date={new Date()}>

         <Comment id="67676" user="Gustav Strömfelt" content={
        "@Gustav Strömfelt  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five..."
      } date={new Date()} >

        <Comment id="67676" user="Gustav Strömfelt" content={
          "@Gustav Strömfelt  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five..."
        } date={new Date()} />

<Comment id="67676" user="Gustav Strömfelt" content={
          "@Gustav Strömfelt  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five..."
        } date={new Date()} />
      </Comment>

      </Comment>
    </Grid>
  )
}
