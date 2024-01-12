import { Injectable } from '@nestjs/common';
import { CompanyUser } from 'src/user/company-user.entity';
import { RegularUser } from 'src/user/regular-user.entity';

@Injectable()
export class UtilityService {
  mapNeo4jNodeToUser(node: any): RegularUser | CompanyUser {
    if (node.properties.type == 'company') {
      return this.mapNeo4jNodeToCompanyUser(node)
    }
    else {
      return this.mapNeo4jNodeToRegularUser(node)
    }
  }

  mapNeo4jNodeToRegularUser(node: any, passwordInclude: boolean = true): RegularUser {
    const user = new RegularUser();
    user.id = node.identity.toString();
    user.name = node.properties.name;
    user.surname = node.properties.surname;
    user.email = node.properties.email;
    if (passwordInclude)
      user.password = node.properties.password;
    user.phone = node.properties.phone;
    user.type = node.properties.type;
    user.birthDate = node.properties.birthDate;
    return user;
  }

  mapNeo4jNodeToCompanyUser(node: any, passwordInclude: boolean = true): CompanyUser {
    const user = new CompanyUser();
    user.id = node.identity.toString();
    user.name = node.properties.name;
    user.email = node.properties.email;
    if (passwordInclude)
      user.password = node.properties.password;
    user.phone = node.properties.phone;
    user.type = node.properties.type;
    user.yearEstablished = node.properties.yearEstablished;
    user.gradeNumber = node.properties.gradeNumber;
    user.gradeSum = node.properties.gradeSum;
    return user;
  }
}
