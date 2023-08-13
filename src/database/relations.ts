export const relations = (db: DB) => {
    // User has one Auth
    db.Users.hasOne(db.Auth, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'auth',
    });

    // Auth belongs to one User
    db.Auth.belongsTo(db.Users, {
        targetKey: 'id',
        foreignKey: 'userId',
        as: 'user',
    });
};
