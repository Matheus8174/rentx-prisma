import '@config/env';

import app from '@shared/infra/http/app';

const port = process.env.PORT || 3000;

app.listen(port);
