const GameServer = require('../models/game.server.model')

class GameServerService {
  async getList() {
    const res = await GameServer.findAll()

    return res
  }

  async create({ game_id, server_id, server_name }) {
    const res = await GameServer.create({ game_id, server_id, server_name })
    return res ? res.dataValues : null
  }

  async updateById({ id, game_id, server_id, server_name }) {
    const whereOpt = { id }
    const newGameServer = {}

    id && Object.assign(newGameServer, { id })
    game_id && Object.assign(newGameServer, { game_id })
    server_id && Object.assign(newGameServer, { server_id })
    server_name && Object.assign(newGameServer, { server_name })

    const res = await GameServer.update(newGameServer, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async deleteById({ id }) {
    const whereOpt = { id }

    const res = await GameServer.destroy({ where: whereOpt })

    return res > 0 ? true : false
  }
}

module.exports = new GameServerService()
