const { resolve } = require('path')
const { Plugin } = require('powercord/entities')
const { getModule, React } = require('powercord/webpack')
const { inject, uninject } = require('powercord/injector')
const { Icons: { Receipt } } = require('powercord/components')
const { open } = require('powercord/modal')
const { get } = require('powercord/http')

const ConfirmModal = require('./components/ConfirmModal')
const Modal = require('./components/Modal')

module.exports = class TextFileViewer extends Plugin {
    async startPlugin() {
        this.loadCSS(resolve(__dirname, 'style.css'))

        const Attachment = await getModule(['AttachmentUpload'])
        const c = await getModule(['anchorUnderlineOnHover'])

        inject('tfviewer', Attachment, 'default', (args, res) => {
            if (!(args[0] &&
                args[0].filename.match(/\.(?:txt|md|log|c\+\+|cpp|cc|c|h|hpp|mm|m|json|js|jsx|rb|rake|py|asm|fs|cgi|bat|rss|java|graphml|idb|lua|o|gml|prl|sls|conf|cmake|make|sln|vbe|cxx|wbf|vbs|r|wml|php|bash|applescript|fcgi|yaml|ex|exs|sh|ml|actionscript|html|xhtml|htm|js|xml|xls|xsd|css|styl|scss|go)$/)))
                return res

            res.props.children.push(React.createElement(Receipt, {
                className: c.anchor + ' tfview',
                onClick: () => {
                    const o = async () => {
                        const r = await get(args[0].url), content = r.raw.toString()
                        open(() => React.createElement(Modal, { content, file: args[0].filename }))
                    }
                    if (args[0].size / 1024 / 1024 > 2)
                        return open(() => React.createElement(ConfirmModal, { o, size: res.props.children[1].props.children[1].props.children }))
                    o()
                }
            }))

            return res
        })
        Attachment.default.displayName = 'Attachment'
    }

    pluginWillUnload() {
        uninject('tfviewer')
    }
}
