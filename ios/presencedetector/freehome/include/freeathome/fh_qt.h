#include "fh_cglobals.h"
#include "freeathome.h"
#include "fh_controller.h"
#include <QThread>

class QTimer;

class CWorker : public QObject
{
  Q_OBJECT
public:
    explicit CWorker(freeathome::CController* ctrl)
    {
      m_Controller = ctrl;
    }

private slots:
    void OnStarted();
    void OnTimer();
    void RunNextCommand();
private:
  fh_context* m_Controller;
  friend class CWorkerThread;
}; // CWorker

class CWorkerThread : public QThread
{
  Q_OBJECT
public:

  CWorker* m_Worker = nullptr;

private slots:
  void RunNextEvent();

};
