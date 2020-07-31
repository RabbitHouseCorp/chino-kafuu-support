const { ShardingManager } = require("discord.js")
const shardAmount = 2 // How many shards should be spawned

const shards = new ShardingManager("./index.js", {
	respawn: true,
	totalShards: shardAmount
})

let spawnedShards = 0 // DO NOT CHANGE THIS
shards.on("shardCreate", (shard) => {
	console.warn(`Starting shard: ${shard.id}`)
	
	spawnedShards += 1
	if (spawnedShards >= shardAmount) { // If all shards have been launched...
		shards.shards.forEach(launchedShard => {
			launchedShard.eval('this.emit("allShardsLaunched")')
		})
	}
})

shards.spawn()
