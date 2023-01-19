class Lookup {
  async look(model, from, localField, foreignField, as) {
    model
      .aggregate([
        {
          $lookup: {
            from,
            localField,
            foreignField,
            as,
          },
        },
      ])
      .exec((err, result) => {
        if (err) {
          console.error(err);
        } else {
          return result.length ? result : [];
        }
      });
  }
}

export default new Lookup();
