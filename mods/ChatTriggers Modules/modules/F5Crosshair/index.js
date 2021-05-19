//If you use this code, please give some kind of credit. (Optional)
register("renderCrosshair", (event) => {
    if (Client.settings.getSettings().field_74320_O != 0) {
      cancel(event);
    }
  });