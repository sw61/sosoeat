describe('Search page', () => {
  it('metadata 를 잘 가져오는지', async () => {
    const { metadata } = await import('./page');
    expect(metadata).toBeDefined();
    expect(metadata).toMatchSnapshot();
  });
});
