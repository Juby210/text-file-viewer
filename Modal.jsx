const { React, getModule } = require('powercord/webpack')
const { FormTitle } = require('powercord/components')
const { Modal } = require('powercord/components/modal')
const { close } = require('powercord/modal')

module.exports = ({ body, file }) => <Modal size={ Modal.Sizes.LARGE }>
    <Modal.Header>
        <FormTitle tag='h3'>{ file }</FormTitle>
        <Modal.CloseButton onClick={ close } />
    </Modal.Header>
    <Modal.Content
        style={{ paddingBottom: '15px' }}
        className={ getModule(['markup'], false).markup + ' tfmodal' }
    >
        { getModule(['parse', 'parseTopic'], false)
            .parse(`\`\`\`${file.split('.').pop()}\n${body.replace(/`/g, '​`')}\`\`\``)[0] }
    </Modal.Content>
</Modal>
