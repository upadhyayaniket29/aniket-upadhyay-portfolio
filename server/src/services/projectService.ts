import { ProjectRepository } from "../repositories/projectRepository";

export class ProjectService {
  static async getAllProjects() {
    return ProjectRepository.getAll();
  }

  static async getProjectBySlug(slug: string) {
    return ProjectRepository.getBySlug(slug);
  }

  static async createProject(data: any) {
    return ProjectRepository.create(data);
  }

  static async updateProject(id: string, data: any) {
    return ProjectRepository.update(id, data);
  }

  static async deleteProject(id: string) {
    return ProjectRepository.delete(id);
  }
}
