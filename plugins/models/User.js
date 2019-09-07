
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING },
    blacklisted: { type: DataTypes.BOOLEAN, defaultValue: false },
    supporting: { type: DataTypes.JSONB, defaultValue: { status: false, expires: null, level: 0 } },
    
    profile: { type: DataTypes.JSONB, defaultValue: {
      medals: [],
      exp: 0,
      level: 0,
      title: "I'm a ghost ~ ༼ つ ╹ ╹ ༽つ",
      description: "A very strange people... Uhh..",
      background: null,
      saphires: 0,
      gems: 0
    }},
    playlist: { type: DataTypes.JSONB, defaultValue: { musics: [] } },
    oldNicknames: { type: DataTypes.ARRAY(DataTypes.JSONB), defaultValue: [] }
  })
  return User;
}