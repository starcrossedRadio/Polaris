
module.exports = (sequelize, DataTypes) => {
  const Guild = sequelize.define("guild", {
    
    /** CORE DATA
     * @id -> ID of the guild
     * @name -> Name of the guild
     * @blacklisted && @supporting -> Respective blacklisted and premium status
     */

    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING },
    blacklisted: { type: DataTypes.BOOLEAN, defaultValue: false },
    supporting: { type: DataTypes.JSONB, defaultValue: { level: 0, expires: null, status: false } },

    /**
     * @permissions -> Permissions overwrites on bot
     * @modules -> Object for store modules and protocols
     */
    settings: { type: DataTypes.JSONB, defaultValue: { prefix: "-", locale: 'en-US' } },
    permissions: { type: DataTypes.JSONB, defaultValue: {} },
    modules: { type: DataTypes.JSONB, defaultValue: {} }
  })

  return Guild;
}