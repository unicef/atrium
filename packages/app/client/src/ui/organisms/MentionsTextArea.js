import React, { useState, useMemo, useRef, useCallback } from 'react';
import Editor from '@draft-js-plugins/editor'
import createMentionPlugin from '@draft-js-plugins/mention'
import useOutlinedInput from '../hooks/useStyles/useOutlinedInputStyle'
import classNames from 'classnames'
import { EditorState, convertToRaw } from 'draft-js'
import { makeStyles } from '@material-ui/core/styles'
import { searchUser } from '../../api/users'
import { SuggestionRow, Mention } from '../molecules'
import { mergeClassNames } from '../utils'
import '@draft-js-plugins/mention/lib/plugin.css'

const useStyles = makeStyles(() => ({
  editor: props => ({
    boxSizing: 'border-box',
    cursor: 'text',
    padding: '16px',
    borderRadius: '5px',
    marginBottom: '2em',
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    minHeight: props.minHeight
  })
}))

const SUGGESTIONS_PLACEHOLDER = [{ _id: 'loading' }]

const MentionsTextArea = (props) => {
  const ref = useRef(null)
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState(SUGGESTIONS_PLACEHOLDER)
  const [textMentions, setMentions] = useState([])
  const [focused, setFocus] = useState(false)
  
  const classes = useStyles({ minHeight: props.minHeight })
  const inputStyles = useOutlinedInput()
  const editorStyle = classNames(
    mergeClassNames(classes.editor, inputStyles.root), {
    [inputStyles.input]: true,
    [inputStyles.focused]: focused
  })

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent({ mention, className, children }) {
        return (
          <Mention mention={mention} className={className}>
            {children}
          </Mention>
        );
      },
    });

    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, [])

  const setPlaceHolder = useCallback(() => {
    if (suggestions.length > 0 && suggestions[0]._id !== 'loading') setSuggestions(SUGGESTIONS_PLACEHOLDER)
  }, [suggestions])

  const onOpenChange = useCallback((_open) => {
    setOpen(_open)
    setPlaceHolder()
  }, [])

  const onSearchChange = useCallback(({ value }) => {
    
    const fetchUsers = async () => {
      const results = await searchUser({ name: value })
      setSuggestions(results.data.users)
    }
    
    if (typeof value === 'string' && value.length > 0) {
      fetchUsers()
    }

  }, [])

  const onExtractData = () => {
    const content = editorState.getCurrentContent()
    const raw = convertToRaw(content)
    const text = Object.entries(raw.blocks).reduce((acc,[_, block]) => `${acc}${block.text} `, '')
    return text
  }

  const onExtractMentions = () => {
    const content = editorState.getCurrentContent()
    const raw = convertToRaw(content)
    const mentions = Object.entries(raw.entityMap).reduce((acc,[_, entity]) => {
      if (entity.type === 'mention') {
        return [...acc, entity.data.mention]
      }

      return acc
    }, [])

    return mentions
  }

  return (
    <>
      <div
        className={editorStyle}
        onClick={() => {
          if (ref.current !== null) {
            ref.current.focus()
            if (!focused) setFocus(true)
          }
        }}
      >
        <Editor
          editorKey={'editor'}
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          style
          onBlur={() => {
            setFocus(false)
            if (open) setOpen(false)
          }}
          ref={ref}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={(mention) => {
            const existingMentionIndex = textMentions.findIndex(mt => mt._id === mention._id)
            const isPlaceholder = mention._id !== SUGGESTIONS_PLACEHOLDER[0]._id
            if (existingMentionIndex === -1 && isPlaceholder) setMentions([...textMentions, mention])
            if (!isPlaceholder) setSuggestions(SUGGESTIONS_PLACEHOLDER)
            setOpen(false)
          }}
          entryComponent={SuggestionRow}
        />
        {props.renderInnerButton({ onExtractData, onExtractMentions })}
      </div>
      {props.renderOuterButton({ onExtractData, onExtractMentions })}
    </>
  )
}

MentionsTextArea.defaultProps = {
  minHeight: 140,
  renderOuterButton: () => {},
  renderInnerButton: () => {}
}

export default MentionsTextArea
