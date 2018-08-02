# PAIPCTL

**PAIPCTL** is a cli tool to interact with **PAIP** services

At the moment the only available command is **invoke** used to invoke a remote method exposed over nats.

## INSTALLATION

You can install it as a global npm package by running: `npm i -g paipctl`

# USAGE

You can invoke a remote method by pushing a local yaml file:

`paipctl invoke -f test.yaml`

test.yaml

```yaml
subject: login
args:
  - davide.talesco@gmail.com
  - password123
```

You can also pass required parameters directly via command line:

`paipctl invoke --subject login --args davide.talesco@gmail.com password123`
 

TODO: implement global options to override default nats settings
  
## OPTIONS 

Below the accepted command line options:

Parameter Name | Type | Required |  Default | Description
-------- | -------- | ----------- | -------- | ------- |
`--nats` | String | **false** | {} | this is the node-nats client connect option object https://github.com/nats-io/node-nats
`--timeout` | number | **false** | 25000 | this is the milliseconds paip wait before declaring a request timed out

#### Environment Variables

All options are also configurable through environment variables:

Option Name | ENV Key Name | 
-------- | -------- |
nats | `PAIP_CLI_NATS` | 
timeout | `PAIP_CLI_TIMEOUT` | 

Environment variables options have precedence and will overwrite the value passed via command line

*Note* PAIP_NATS and --nats should be stringified