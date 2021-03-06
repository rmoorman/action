import PropTypes from 'prop-types'
import React from 'react'
import Type from 'universal/components/Type/Type'
import {withRouter} from 'react-router-dom'
import portal from 'react-portal-hoc'
import ui from 'universal/styles/ui'
import {ACTION, RETROSPECTIVE} from 'universal/utils/constants'
import {meetingTypeToSlug} from 'universal/utils/meetings/lookups'
import DashModal from 'universal/components/Dashboard/DashModal'
import FlatButton from 'universal/components/FlatButton'
import IconLabel from 'universal/components/IconLabel'
import styled from 'react-emotion'

const StyledButton = styled(FlatButton)({
  margin: '1.5rem auto 0'
})

const MeetingInProgressModal = (props) => {
  const {closeAfter, isClosing, meetingType, modalLayout, teamId, teamName, history} = props
  const handleClick = () => {
    const meetingSlug = meetingTypeToSlug[meetingType]
    history.push(`/${meetingSlug}/${teamId}`)
  }
  return (
    <DashModal
      position='absolute'
      modalLayout={modalLayout}
      isClosing={isClosing}
      closeAfter={closeAfter}
    >
      <Type align='center' bold marginBottom='1.5rem' scale='s7' colorPalette='warm'>
        {'Oh, hi there!'}
      </Type>
      {meetingType === ACTION && (
        <Type align='center' marginBottom='1rem' bold scale='s4'>
          {`The dashboard for ${teamName} is disabled`}
          <br />
          {'as we are actively meeting to review'}
          <br />
          {'Tasks and Agenda Items.'}
        </Type>
      )}
      {meetingType === RETROSPECTIVE && (
        <Type align='center' marginBottom='1rem' bold scale='s4'>
          {`The dashboard for ${teamName} is disabled `}
          <br />
          {'as we are actively in a retrospective.'}
        </Type>
      )}
      <StyledButton size='large' onClick={handleClick} palette='warm'>
        <IconLabel icon='arrow_forward' iconAfter label='Join Meeting' />
      </StyledButton>
    </DashModal>
  )
}

MeetingInProgressModal.propTypes = {
  closeAfter: PropTypes.number,
  isClosing: PropTypes.bool,
  meetingType: PropTypes.string.isRequired,
  modalLayout: PropTypes.oneOf(ui.modalLayout),
  history: PropTypes.object,
  teamId: PropTypes.string,
  teamName: PropTypes.string
}

export default portal({closeAfter: 100})(withRouter(MeetingInProgressModal))
