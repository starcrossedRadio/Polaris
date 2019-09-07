
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
      
      /** CORE DATA
       * @guildID -> ID of the guild as a master/slave relation.
       */
  
      guildID: { type: DataTypes.STRING, primaryKey: true },
      name: { type: DataTypes.STRING },
      ranking: { type: DataTypes.INTEGER },
      level: { type: DataTypes.INTEGER, defaultValue: 1 },
      xp: { type: DataTypes.INTEGER, defaultValue: 0 },
      nextLevel: { type: DataTypes.INTEGER, defaultValue: 500 }
    })
  
    return Member;
  }