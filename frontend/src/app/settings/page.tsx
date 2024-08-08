import { SettingsForm } from "./settingsForm";
import { fetchSettings } from "./fetch";
import { Suspense } from "react";

const SettingsPage = async () => {
  const user = fetchSettings();

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Suspense fallback={<p>⌛Loading...</p>}>
              <SettingsForm user={user} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
