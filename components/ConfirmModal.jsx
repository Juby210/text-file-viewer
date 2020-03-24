const { React } = require('powercord/webpack')
const { Text } = require('powercord/components')
const { Confirm } = require('powercord/components/modal')
const { close } = require('powercord/modal')

module.exports = ({ o, size }) => <Confirm
    red={ false }
    header='Are you sure to view this file?'
    confirmText='Yes'
    cancelText='No'
    onCancel={ close }
    onConfirm={ () => { o(); close() } }
>
    <Text color={ Text.Colors.PRIMARY } size={ Text.Colors.MEDIUM }>
        This file has <strong>{ size }</strong>! I don't recommend to open <strong>2 MB+</strong> files.
    </Text>
</Confirm>
