describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/', { timeout: 60000 })

    cy.get('[data-test="text-render"]').should('exist').contains('Todo List');
    cy.get('[data-test="create-task-component"]').should('exist').click().contains('Add a task...').get('#create-btn').should('exist').contains('Create Task');
    cy.get('[data-test="input_"]').should('exist').type('salam').should('have.value', 'salam');
    cy.get('[data-test="input__"]').should('exist').type('ramadan').should('have.value', 'ramadan');

    cy.get('#wa3').should('exist').click();
    cy.get('[data-test="select__"]').should('exist').click();
    cy.get('[data-test="close-btn"]').should('exist').click();

    cy.get('[data-test="close-btn"]').should('exist').click();

    // edit btn
    const more_btn_card = cy.get('[data-test="card__"]').should('exist').get('[data-test="card__more_btn"]').should('exist').click({ multiple: true, force: true }).get('[data-test="card_edit_btn"]').should('exist')
    more_btn_card.click().get('[data-test="card__title"]').should('exist').contains('Edit Task')
    cy.get('[data-test="input_"]').should('exist').type('salam').should('have.value', 'salam');
    cy.get('[data-test="input__"]').should('exist').type('ramadan').should('have.value', 'ramadan');
    more_btn_card.click().get('#create-btn').should('exist').contains('Edit Task').click()

    // remove btn

    // const more_btn_card_2 = cy.get('[data-test="card__"]').should('exist').get('[data-test="card__more_btn"]').should('exist').click({ multiple: true, force: true }).get('[data-test="card_remove_btn"]').should('exist')
    // more_btn_card_2.click().get('[data-test="remove-model"]').should('exist').contains('Are you sure ?')
    // more_btn_card_2.click().get('[data-test="remove-delete"]').should('exist').contains('Delete')
    // more_btn_card_2.click().get('[data-test="remove-cancel"]').should('exist').contains('Cancel')


    // details
    cy.get('[data-test="details_btn"]').should('exist').click();
    cy.get('[data-test="d_de"]').should('exist').contains('Details :');
    cy.get('[data-test="d_disc"]').should('exist').contains('Description :');
    cy.get('[data-test="d_t"]').should('exist').contains('Title :');
    cy.get('[data-test="d_d"]').should('exist').contains('Created Date :');
    cy.get('[data-test="d_s"]').should('exist').contains('Status :');
    cy.get('[data-test="d_p"]').should('exist').contains('Priority :');
    cy.get('[data-test="d_back_btn"]').should('exist').click({ force: true });

  })
})

describe('check tasks data', () => {
  it('should check if the check tasks data is empty', () => {
    cy.request('http://localhost:3000/tasks').then((response) => {
      const arrayOfObjects = response.body;
      const allHaveName = arrayOfObjects.every(obj => obj.title.length > 0);
      const allHavedisc = arrayOfObjects.every(obj => obj.disc.length > 0);
      const allHavepraio = arrayOfObjects.every(obj => obj.praio.length > 0);
      const allHavestatus = arrayOfObjects.every(obj => obj.status.length > 0);
      expect(allHaveName).to.be.true;
      expect(allHavedisc).to.be.true;
      expect(allHavepraio).to.be.true;
      expect(allHavestatus).to.be.true;
    });
  });
});
