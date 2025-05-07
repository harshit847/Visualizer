exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          name: "Ryan Johnson",
          email: "ryanj89@gmail.com"
        },
        {
          name: "Lindsay Bendell",
          email: "lbendell3@gmail.com"
        }
      ])
    })
}