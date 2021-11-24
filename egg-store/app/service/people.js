module.exports = app => {
  class PeopleService extends app.Service {
    async peopleList(){
      
      return [5,6,7,8]
    }
  }
  return PeopleService
}
