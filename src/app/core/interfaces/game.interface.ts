export interface MinimumSystemRequirements {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  }
  
  export interface Screenshot {
    id: string;
    image: string; 
  }
  
  export interface Game {
    id: string;
    title: string;
    description: string;
    short_description: string;
    developer: string;
    publisher: string;
    genre: string;
    platform: string;
    release_date: string;
    freetogame_profile_url: string;
    game_url: string;
    status: string;
    thumbnail: string;
    minimum_system_requirements: MinimumSystemRequirements;
    screenshots: Screenshot[];
  }