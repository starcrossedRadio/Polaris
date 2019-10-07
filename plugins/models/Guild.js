
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
    levelSystem: { type: DataTypes.JSONB, defaultValue: { config: { message: "Hey {{user}}, you're now level {{level}}! chu ~ <3", delete: false }, roles: { 10: null, 20: null, 30: null, 40: null, 50: null, 60: null, 70: null, 80: null, 90: null, 100: null }, members: [], enabled: true } },
    inframodules: { type: DataTypes.JSONB, defaultValue: {} },
  })

  return Guild;
}