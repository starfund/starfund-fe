import httpClient from 'httpClient';

class TeamService {
  static getTeams(withContent) {
    return httpClient.get(`/teams?with_content=${withContent}`);
  }
}

export default TeamService;
