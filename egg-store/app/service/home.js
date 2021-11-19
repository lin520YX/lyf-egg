module.exports = app => {
  class HomeService extends app.Service {
    async homeList(){
      let {ctx} = this
      const list = await ctx.service.people.peopleList()
      return [1,2,3,4].concat(list)
    }
  }
  return HomeService
}
