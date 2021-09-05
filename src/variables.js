module.exports = {
    initVariableDefinitions() {
        // Define variables
        const variables = []

        variables.push({
            label: 'Selected Media Player',
            name: 'media_player',
        })

        // Configure variables
        this.setVariableDefinitions(variables)

        // Set initial values
        this.updateVariable('media_player', this.store.variables.selectedMediaPlayer)
    },

    updateVariable(name, value) {
        switch (name) {
            case 'media_player':
                this.store.variables.selectedMediaPlayer = value
                this.setVariable('media_player', value)
                this.checkFeedbacks('selected_media_player')
                break
            default:
                break
        }
    }
}
