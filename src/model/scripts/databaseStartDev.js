(async = () => {
  startDataBase();
})();

async function startDataBase() {
  const database = require('../../config/db');
  const modelUserTypes = require('../registerUserTypes');
  const modelUsers = require('../registerUsers');
  const modelComponents = require('../registerComponents');
  const modelGrantTemplates = require('../registerGrantTemplates');
  const modelGrants = require('../registerGrants');
  const modelContactTypes = require('../registerContactTypes');
  const modelContactAreas = require('../registerContactAreas');
  const modelContactPositions = require('../registerContactPositions');
  const modelOrganizationTypes = require('../registerOrganizationTypes');
  const modelOrganizations = require('../registerOrganizations');
  const modelContacts = require('../registerContacts');
  const modelPasswords = require('../registerPasswords');
  const modelFileTypes = require('../logFileTypes');
  const modelFiles = require('../logFiles');
  const modelAnnotationStatus = require('../logAnnotationStatus');
  const modelAnnotations = require('../logAnnotations');
  const modelAnnotationMovements = require('../logAnnotationMovements');
  const modelAnnotationResponsable = require('../logAnnotationResponsables');
  const modelAnonimizators = require('../logAnonimizators');
  const modelAnonimizatorVersions = require('../logAnonimizatorVersions');

  // Cria type de users base
  const typeUserAdmin = await modelUserTypes.create({ description: 'admin' });
  const typeUserManager = await modelUserTypes.create({
    description: 'manager',
  });
  const typeUserAnotator = await modelUserTypes.create({
    description: 'anotator',
  });

  // Cria components
  const componentRegisterUser = await modelComponents.create({
    description: 'registerUser',
    route: 'register/user/',
  });
  const componentRegisterOrganization = await modelComponents.create({
    description: 'registerOrganization',
    route: 'register/organization/',
  });
  const componentAnnotation = await modelComponents.create({
    description: 'annotation',
    route: 'annotation/',
  });
  const componentAnnotationReturned = await modelComponents.create({
    description: 'annotationReturned',
    route: 'annotation/returned/',
  });
  const componentAnnotationRejected = await modelComponents.create({
    description: 'annotationRejected',
    route: 'annotation/rejected/',
  });
  const componentAnnotationPreAnnotated = await modelComponents.create({
    description: 'annotationPreAnnotated',
    route: 'annotation/pre_annotated/',
  });
  const componentAnnotationAnnotated = await modelComponents.create({
    description: 'annotationAnnotated',
    route: 'annotation/annotated/',
  });

  // Cria Grant Template
  const grantTemplateAdminRegisterUser = await modelGrantTemplates.create({
    userTypeId: typeUserAdmin.id,
    componentId: componentRegisterUser.id,
    description: 'Acesso Admin para registrar Users',
    version: 1,
    typeGrant: 'write',
  });
  const grantTemplateAdminRegisterOrganization =
    await modelGrantTemplates.create({
      userTypeId: typeUserAdmin.id,
      componentId: componentRegisterOrganization.id,
      description: 'Acesso Admin para registrar Organizations',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateAdminAnnotations = await modelGrantTemplates.create({
    userTypeId: typeUserAdmin.id,
    componentId: componentAnnotation.id,
    description: 'Acesso Admin para Annotations abertas',
    version: 1,
    typeGrant: 'write',
  });
  const grantTemplateAdminAnnotationsReturned =
    await modelGrantTemplates.create({
      userTypeId: typeUserAdmin.id,
      componentId: componentAnnotationReturned.id,
      description: 'Acesso Admin para Annotations devolvidas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateAdminAnnotationsRejected =
    await modelGrantTemplates.create({
      userTypeId: typeUserAdmin.id,
      componentId: componentAnnotationRejected.id,
      description: 'Acesso Admin para Annotations rejeitadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateAdminAnnotationsPreAnnotated =
    await modelGrantTemplates.create({
      userTypeId: typeUserAdmin.id,
      componentId: componentAnnotationPreAnnotated.id,
      description: 'Acesso Admin para Annotations pré-anotadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateAdminAnnotationsAnnotated =
    await modelGrantTemplates.create({
      userTypeId: typeUserAdmin.id,
      componentId: componentAnnotationAnnotated.id,
      description: 'Acesso Admin para Annotations aprovadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateManagerAnnotations = await modelGrantTemplates.create({
    userTypeId: typeUserManager.id,
    componentId: componentAnnotation.id,
    description: 'Acesso Manager para Annotations abertas',
    version: 1,
    typeGrant: 'write',
  });
  const grantTemplateManagerAnnotationsReturned =
    await modelGrantTemplates.create({
      userTypeId: typeUserManager.id,
      componentId: componentAnnotationReturned.id,
      description: 'Acesso Manager para Annotations devolvidas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateManagerAnnotationsRejected =
    await modelGrantTemplates.create({
      userTypeId: typeUserManager.id,
      componentId: componentAnnotationRejected.id,
      description: 'Acesso Manager para Annotations rejeitadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateManagerAnnotationsPreAnnotated =
    await modelGrantTemplates.create({
      userTypeId: typeUserManager.id,
      componentId: componentAnnotationPreAnnotated.id,
      description: 'Acesso Manager para Annotations pré-anotadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateManagerAnnotationsAnnotated =
    await modelGrantTemplates.create({
      userTypeId: typeUserManager.id,
      componentId: componentAnnotationAnnotated.id,
      description: 'Acesso Manager para Annotations aprovadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateAnotatorAnnotationsRejected =
    await modelGrantTemplates.create({
      userTypeId: typeUserAnotator.id,
      componentId: componentAnnotationRejected.id,
      description: 'Acesso Anotator para Annotations rejeitadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateAnotatorAnnotationsPreAnnotated =
    await modelGrantTemplates.create({
      userTypeId: typeUserAnotator.id,
      componentId: componentAnnotationPreAnnotated.id,
      description: 'Acesso Anotator para Annotations pré-anotadas',
      version: 1,
      typeGrant: 'write',
    });
  const grantTemplateAnotatorAnnotationsAnnotated =
    await modelGrantTemplates.create({
      userTypeId: typeUserAnotator.id,
      componentId: componentAnnotationAnnotated.id,
      description: 'Acesso Anotator para Annotations aprovadas',
      version: 1,
    });

  // Cria User
  const lucasUser = await modelUsers.create({
    userTypeId: typeUserAdmin.id,
    firstName: 'Lucas',
    lastName: 'Fenelon Fake',
    dtNasc: '1993-11-06 00:00:00',
    email: 'lucasgfmoraes@gmail.com',
  });
  const lucas2User = await modelUsers.create({
    userTypeId: typeUserAnotator.id,
    firstName: 'Flávio',
    lastName: 'Fake',
    dtNasc: '1990-10-10 00:00:00',
    email: 'lucasgfmoraes@gmail.com',
  });
  const lucas3User = await modelUsers.create({
    userTypeId: typeUserAnotator.id,
    firstName: 'Guilherme',
    lastName: 'Sakaka Fake',
    dtNasc: '1985-10-10 00:00:00',
    email: 'lucasgfmoraes@gmail.com',
  });
  const lucas4User = await modelUsers.create({
    userTypeId: typeUserAnotator.id,
    firstName: 'Lucas',
    lastName: 'Oliveira Fake',
    dtNasc: '1980-10-10 00:00:00',
    email: 'lucasgfmoraes@gmail.com',
  });

  // Cria Grant
  const grantAdminRegisterUser = await modelGrants.create({
    userId: lucasUser.id,
    componentId: componentRegisterUser.id,
    grantTemplateReferenceId: grantTemplateAdminRegisterUser.id,
    typeGrant: 'write',
  });
  const grantAdminRegisterOrganization = await modelGrants.create({
    userId: lucasUser.id,
    componentId: componentRegisterOrganization.id,
    grantTemplateReferenceId: grantTemplateAdminRegisterOrganization.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotations = await modelGrants.create({
    userId: lucasUser.id,
    componentId: componentAnnotation.id,
    grantTemplateReferenceId: grantTemplateAdminAnnotations.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsReturned = await modelGrants.create({
    userId: lucasUser.id,
    componentId: componentAnnotationReturned.id,
    grantTemplateReferenceId: grantTemplateAdminAnnotationsReturned.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsRejected = await modelGrants.create({
    userId: lucasUser.id,
    componentId: componentAnnotationRejected.id,
    grantTemplateReferenceId: grantTemplateAdminAnnotationsRejected.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsPreAnnotated = await modelGrants.create({
    userId: lucasUser.id,
    componentId: componentAnnotationPreAnnotated.id,
    grantTemplateReferenceId: grantTemplateAdminAnnotationsPreAnnotated.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsAnnotated = await modelGrants.create({
    userId: lucasUser.id,
    componentId: componentRegisterUser.id,
    grantTemplateReferenceId: grantTemplateAdminAnnotationsAnnotated.id,
    typeGrant: 'write',
  });

  const grantAdminAnnotationsRejectedLucas2 = await modelGrants.create({
    userId: lucas2User.id,
    componentId: componentAnnotationRejected.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsPreAnnotatedLucas2 = await modelGrants.create({
    userId: lucas2User.id,
    componentId: componentAnnotationPreAnnotated.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsAnnotatedLucas2 = await modelGrants.create({
    userId: lucas2User.id,
    componentId: componentAnnotationAnnotated.id,
  });
  const grantAdminAnnotationsRejectedLucas3 = await modelGrants.create({
    userId: lucas3User.id,
    componentId: componentAnnotationRejected.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsPreAnnotatedLucas3 = await modelGrants.create({
    userId: lucas3User.id,
    componentId: componentAnnotationPreAnnotated.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsAnnotatedLucas3 = await modelGrants.create({
    userId: lucas3User.id,
    componentId: componentAnnotationAnnotated.id,
  });
  const grantAdminAnnotationsRejectedLucas4 = await modelGrants.create({
    userId: lucas4User.id,
    componentId: componentAnnotationRejected.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsPreAnnotatedLucas4 = await modelGrants.create({
    userId: lucas4User.id,
    componentId: componentAnnotationPreAnnotated.id,
    typeGrant: 'write',
  });
  const grantAdminAnnotationsAnnotatedLucas4 = await modelGrants.create({
    userId: lucas4User.id,
    componentId: componentAnnotationAnnotated.id,
  });

  // Cria Contact Type
  const contactTypeResponsable = await modelContactTypes.create({
    description: 'responsavel',
  });
  const contactTypeResponsavelTecnologia = await modelContactTypes.create({
    description: 'tecnologia',
  });
  const contactTypeContratante = await modelContactTypes.create({
    description: 'contratante',
  });

  // Cria Contact Area
  const contactAreaManagement = await modelContactAreas.create({
    description: 'alta-gestao',
  });
  const contactAreaCompras = await modelContactAreas.create({
    description: 'compras',
  });
  const contactAreaTecnologia = await modelContactAreas.create({
    description: 'tecnologia',
  });

  // Cria Contact Position
  const contactPositionCEO = await modelContactPositions.create({
    description: 'ceo',
  });
  const contactPositionCTO = await modelContactPositions.create({
    description: 'cto',
  });
  const contactPositionArquitetoTI = await modelContactPositions.create({
    description: 'arquiteto-ti',
  });

  // Cria Organization Type
  const organizationTypePrivateSmall = await modelOrganizationTypes.create({
    size: 'small',
    description: 'privada',
  });
  const organizationTypePrivateMedium = await modelOrganizationTypes.create({
    size: 'medium',
    description: 'privada',
  });
  const organizationTypePrivateLarge = await modelOrganizationTypes.create({
    size: 'large',
    description: 'privada',
  });

  // Cria Organization
  const organizationFake = await modelOrganizations.create({
    organizationTypeId: organizationTypePrivateLarge.id,
    name: 'Fake',
    document: '00.000.000/0001-00',
    emploiesQuantity: '500-1000',
    contactEmail: 'teste@fake.com',
    contactPhoneNumber: '(11) 98888-7777',
    address: 'Rua Piraja 42, São Gonzalo, Lolópoliz - RJ',
  });
  const organizationFakeFilial = await modelOrganizations.create({
    organizationTypeId: organizationTypePrivateLarge.id,
    name: 'Fake 2',
    document: '00.000.000/0002-00',
    emploiesQuantity: '500-1000',
    contactEmail: 'teste@fake2.com',
    contactPhoneNumber: '(22) 96666-5555',
    address: 'Marginal Pinheiros 1500, Morumbi, São Paulo - SP',
    isSubsidiary: 'yes',
    organizationHeadQarterId: organizationFake.id,
  });

  // Cria Contact
  const contactLucas = await modelContacts.create({
    organizationId: organizationFake.id,
    contactTypeId: contactTypeResponsavelTecnologia.id,
    contactAreaId: contactAreaTecnologia.id,
    contactPositionId: contactPositionArquitetoTI.id,
    firsName: 'Lucas',
    lastName: 'Moraes Fake',
    dtNasc: '1993-11-06 00:00:00',
    document: '000.000.000-00',
    email: 'lucasgfmoraes@hotmail.com',
    phoneNumber: '(33) 94444-0000',
  });

  // Cria File Type
  const fileTypeOriginal = await modelFileTypes.create({
    description: 'orgiginal-cliente',
  });
  const fileTypeAnotacao = await modelFileTypes.create({
    description: 'anotacao',
  });
  const fileTypeAplicacao = await modelFileTypes.create({
    description: 'aplicacao',
  });

  // Cria Annotation Status
  const annotationStatusAnotar = await modelAnnotationStatus.create({
    description: 'Anotar',
  });
  const annotationStatusDevolvido = await modelAnnotationStatus.create({
    description: 'Devolvido',
  });
  const annotationStatusPreAnotado = await modelAnnotationStatus.create({
    description: 'Pré-anotado',
  });
  const annotationStatusRejeitado = await modelAnnotationStatus.create({
    description: 'Rejeitado',
  });
  const annotationStatusAprovado = await modelAnnotationStatus.create({
    description: 'Aprovado',
  });

  //console.log("type's auto-generated ID:", type.id);
}
