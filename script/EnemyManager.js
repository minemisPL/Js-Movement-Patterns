class EnemyManager {
    constructor() {
        this._enemyGroups = []
    }

    addEnemyGroup(id, enemyGroup) {
        this._enemyGroups.push({
            id: id,
            enemyGroup: enemyGroup,
        })
    }

    getEnemyGroup(id) {
        let foundGroup = null

        this._enemyGroups.forEach(group => {
            if (group.id === id) {
                foundGroup = group.enemyGroup
            }
        })
        return foundGroup
    }

    getEnemyGroups() {
        return this._enemyGroups
    }
}

export const enemyManager = new EnemyManager()