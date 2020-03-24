const { React, getModule } = require('powercord/webpack')
const { FormTitle } = require('powercord/components')
const { Modal } = require('powercord/components/modal')
const { close } = require('powercord/modal')

module.exports = ({ content, file }) => <Modal size={ Modal.Sizes.LARGE }>
    <Modal.Header>
        <FormTitle tag='h3'>{ file }</FormTitle>
        <Modal.CloseButton onClick={ close } />
    </Modal.Header>
    <Modal.Content
        className={ getModule(['markup'], false).markup + ' tfmodal' }
    >
        { getModule(['parse', 'parseTopic'], false).defaultRules.codeBlock
            .react({ content, lang: file.split('.').pop() }, null, {}) }
    </Modal.Content>
</Modal>
