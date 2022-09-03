(async = () => {
  queryDataBase();
})();

async function queryDataBase() {
  const { Sequelize, Op } = require('sequelize');
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
  const modelFileTypes = require('../logFileTypes');
  const modelAnnotationStatus = require('../logAnnotationStatus');

  const testQueryAnotators = await modelUserTypes.findAll({
    where: {
      description: 'anotator',
    },
  });

  const testQueryAnotatorActives = await modelUsers.findAll({
    attributes: ['id', 'firstName', 'lastName'],
    include: {
      model: modelUserTypes,
      where: {
        description: { [Op.eq]: 'anotator' },
      },
    },
    where: {
      active: 'yes',
    },
  });

  const testQueryComponents = await modelComponents.findAll({
    where: {
      route: { [Op.like]: 'annotation%' },
    },
  });

  const testQueryGrantTemplates = await modelGrantTemplates.findAll({
    include: [
      {
        model: modelUserTypes,
        where: {
          description: { [Op.eq]: 'anotator' },
        },
      },
      {
        model: modelComponents,
        where: {
          route: { [Op.like]: 'annotation%' },
        },
      },
    ],
    where: {
      active: 'yes',
    },
  });

  const testQueryGrant = await modelGrants.findAll({
    include: [
      {
        model: modelUsers,
        where: {
          firstName: { [Op.eq]: 'Lucas' },
        },
      },
      {
        model: modelComponents,
        where: {
          route: { [Op.like]: 'annotation%' },
        },
      },
      {
        model: modelGrantTemplates,
        include: {
          model: modelUserTypes,
          where: {
            description: { [Op.eq]: 'admin' },
          },
        },
      },
    ],
    where: {
      active: 'yes',
    },
  });

  const testQueryContactTypes = await modelContactTypes.findAll({
    where: {
      description: 'contratante',
    },
  });

  const testQueryContactAreas = await modelContactAreas.findAll({
    where: {
      description: 'compras',
    },
  });

  const testQueryContactPositions = await modelContactPositions.findAll({
    where: {
      description: 'ceo',
    },
  });

  const testQueryOrganizationTypes = await modelOrganizationTypes.findAll({
    where: {
      description: 'privada',
      size: 'small',
    },
  });

  const testQueryOrganization = await modelOrganizations.findAll({
    include: [
      {
        model: modelOrganizationTypes,
        where: {
          description: 'privada',
          size: 'large',
        },
      },
    ],
    where: {
      active: 'yes',
      isSubsidiary: 'yes',
      organizationHeadQarterId: [
        Sequelize.literal(
          `SELECT id FROM register.Organizations WHERE name = 'Fake'`,
        ),
      ],
    },
  });

  const testQueryContact = await modelContacts.findAll({
    include: [
      {
        model: modelOrganizations,
        where: {
          name: { [Op.eq]: 'Fake' },
        },
      },
      {
        model: modelContactTypes,
        where: {
          description: 'tecnologia',
        },
      },
      {
        model: modelContactAreas,
        where: {
          description: 'tecnologia',
        },
      },
      {
        model: modelContactPositions,
        where: {
          description: 'arquiteto-ti',
        },
      },
    ],
    where: {
      active: 'yes',
    },
  });

  const testQueryFileTypes = await modelFileTypes.findAll({
    where: {
      description: 'aplicacao',
    },
  });

  const testQueryAnnotationStatus = await modelAnnotationStatus.findAll({
    where: {
      description: 'rejeitado',
    },
  });

  console.log(testQueryAnotators);
  console.log(testQueryAnotatorActives);
  //   console.log(testQueryComponents);
  //   console.log(testQueryGrantTemplates);
  //   console.log(testQueryGrant);
  //   console.log(testQueryContactTypes);
  //   console.log(testQueryContactAreas);
  //   console.log(testQueryContactPositions);
  //   console.log(testQueryOrganizationTypes);
  //   console.log(testQueryOrganization);
  //   console.log(testQueryContact);
  //   console.log(testQueryFileTypes);
  //   console.log(testQueryAnnotationStatus);
}
