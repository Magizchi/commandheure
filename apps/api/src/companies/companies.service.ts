import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) { };

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  async getMenu() {
    const result = await this.companyRepository.find({
      relations: {
        category: true
      }
    });
    const formatMenu = result.map((item) => ({ name: item.name, categories: item.category.map(each => each.name) }));
    return formatMenu;
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
